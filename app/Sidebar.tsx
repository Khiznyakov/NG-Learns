"use client";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import { useAuth } from "./AuthProvider";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import FeedbackIcon from '@mui/icons-material/Feedback';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

export default function Sidebar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFeedbackSend = () => {
    if (feedback.trim()) {
      const stored = localStorage.getItem("nglearn_feedbacks");
      const feedbacks = stored ? JSON.parse(stored) : [];
      const updated = [{ msg: feedback, date: new Date().toISOString(), user: user || "Гость", status: "new" }, ...feedbacks];
      localStorage.setItem("nglearn_feedbacks", JSON.stringify(updated));
      setFeedback("");
      setFeedbackSent(true);
      setTimeout(() => {
        setFeedbackSent(false);
        setFeedbackOpen(false);
      }, 1500);
    }
  };

  if (!isAuthenticated) return null;
  const navItems = [
    { label: "Главная", href: "/" },
    { label: "Курсы", href: "/courses" },
    { label: "Иерархия", href: "/hierarchy" },
    { label: "Личный кабинет", href: "/profile" },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar />
      <Box sx={{ px: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#181818', letterSpacing: 1 }}>
          NG Learn
        </Typography>
        <Typography variant="body2" sx={{ color: '#888', mb: 2 }}>
          {user}
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton component={Link} href={item.href}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#181818',
                  sx: { letterSpacing: 0.2 },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, mb: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<FeedbackIcon />}
          sx={{ mb: 1 }}
          onClick={() => setFeedbackOpen(true)}
        >
          Обратная связь
        </Button>
        <Button variant="outlined" color="secondary" fullWidth onClick={logout}>
          Выйти
        </Button>
      </Box>
      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Обратная связь</DialogTitle>
        <DialogContent>
          <TextField
            multiline
            minRows={3}
            maxRows={6}
            fullWidth
            placeholder="Опишите ошибку или пожелание..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            variant="outlined"
            sx={{ mt: 1 }}
          />
          {feedbackSent && <Typography color="success.main" sx={{ mt: 1 }}>Спасибо за обратную связь!</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)} color="secondary">Отмена</Button>
          <Button onClick={handleFeedbackSend} color="primary" variant="contained" disabled={!feedback.trim()}>
            Отправить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <AppBar position="fixed" color="default" elevation={1} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, ml: 2 }}>
              NG Learn
            </Typography>
          </Toolbar>
        </AppBar>
      )}
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 } }} aria-label="mailbox folders">
        {/* Мобильный Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              borderRight: '1px solid #eee',
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Десктопный Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              borderRight: '1px solid #eee',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      {/* Отступ для AppBar на мобильных */}
      {isMobile && <Toolbar />}
    </>
  );
} 