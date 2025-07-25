"use client";
import { Box, Typography, Button, Paper, Stack, LinearProgress, Avatar, Fade, IconButton, TextField, Chip } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../AuthProvider";
import { useState, useEffect } from "react";

const MOCK_USER = {
  name: "Иван Иванов",
  role: "Сотрудник",
  email: "user@example.com",
  progress: 65,
  avatar: "", // можно добавить url картинки
};

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

export default function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [feedbacks, setFeedbacks] = useState<{ msg: string; user: string; date: string; status: string }[]>([]);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nglearn_feedbacks");
    if (stored) setFeedbacks(JSON.parse(stored));
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setAvatarUrl(url);
    }
  };

  const handleFeedbackSend = () => {
    if (feedback.trim()) {
      const newFeedback = {
        msg: feedback,
        user: user || "Аноним",
        date: new Date().toISOString(),
        status: "new",
      };
      const updated = [newFeedback, ...feedbacks];
      setFeedbacks(updated);
      localStorage.setItem("nglearn_feedbacks", JSON.stringify(updated));
      setFeedback("");
      setFeedbackSent(true);
      setTimeout(() => setFeedbackSent(false), 2000);
    }
  };

  const handleFeedbackStatus = (idx: number, status: string) => {
    const updated = feedbacks.map((f, i) => i === idx ? { ...f, status } : f);
    setFeedbacks(updated);
    localStorage.setItem("nglearn_feedbacks", JSON.stringify(updated));
  };
  const handleFeedbackDelete = (idx: number) => {
    const updated = feedbacks.filter((_, i) => i !== idx);
    setFeedbacks(updated);
    localStorage.setItem("nglearn_feedbacks", JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h4" sx={{ mb: 3, color: '#181818', fontWeight: 700 }}>
          Вход в личный кабинет
        </Typography>
        <Button variant="contained" color="primary" size="large" href="/">
          Войти
        </Button>
      </Box>
    );
  }

  const isAdmin = user === 'admin';
  const myFeedbacks = isAdmin ? feedbacks : feedbacks.filter(f => f.user === user);

  return (
    <Fade in timeout={600}>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 6, width: '100%' }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: 4,
        }}>
          {/* Блок профиля */}
          <Box>
            <Paper sx={{ p: 4, mb: 2, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)', borderRadius: 4 }}>
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ width: 72, height: 72, bgcolor: '#7bb6e9', fontSize: 32 }} src={avatarUrl}>
                  {!avatarUrl && getInitials(MOCK_USER.name)}
                </Avatar>
                <IconButton component="label" size="small" sx={{ position: 'absolute', top: 60, left: 60, bgcolor: '#fff', boxShadow: 1 }}>
                  <PhotoCamera fontSize="small" />
                  <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#181818', textAlign: 'center' }}>
                  {MOCK_USER.name}
                </Typography>
                <Typography color="text.secondary">{user}</Typography>
                <Typography color="text.secondary">{MOCK_USER.email}</Typography>
                <Typography color="text.secondary">{MOCK_USER.role}</Typography>
              </Stack>
            </Paper>
            {/* Блок безопасности */}
            <Paper sx={{ p: 3, background: 'rgba(255,255,255,0.7)', mb: 2 }}>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Безопасность</Typography>
              <Button variant="outlined" color="primary" fullWidth disabled>
                Сменить пароль
              </Button>
              <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={logout}>
                Выйти
              </Button>
            </Paper>
          </Box>
          {/* Блок прогресса */}
          <Box>
            <Paper sx={{ p: 4, mb: 2, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)', borderRadius: 4 }}>
              <Typography sx={{ mb: 2, fontWeight: 500 }}>Общий прогресс обучения</Typography>
              <LinearProgress variant="determinate" value={MOCK_USER.progress} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
              <Typography variant="caption" color="text.secondary">{MOCK_USER.progress}%</Typography>
            </Paper>
          </Box>
        </Box>
        {/* Блок обратной связи */}
        <Paper sx={{ p: 4, mt: 4, background: 'rgba(255,255,255,0.9)' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#181818' }}>
            Обратная связь
          </Typography>
          {myFeedbacks.length === 0 ? (
            <Typography color="text.secondary">Нет сообщений</Typography>
          ) : (
            <Stack spacing={2}>
              {myFeedbacks.map((f, idx) => (
                <Paper key={idx} sx={{ p: 2, background: f.status === 'done' ? 'rgba(200,255,200,0.2)' : 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ mb: 1 }}>{f.msg}</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip label={f.user} size="small" />
                      <Typography variant="caption" color="text.secondary">{new Date(f.date).toLocaleString()}</Typography>
                      {f.status === 'done' && <Chip label="Исправлено" color="success" size="small" icon={<CheckCircleIcon fontSize="small" />} />}
                    </Stack>
                  </Box>
                  {isAdmin && f.status !== 'done' && (
                    <Button size="small" color="success" startIcon={<CheckCircleIcon />} onClick={() => handleFeedbackStatus(idx, 'done')}>
                      Исправлено
                    </Button>
                  )}
                  {isAdmin && (
                    <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleFeedbackDelete(idx)}>
                      Удалить
                    </Button>
                  )}
                </Paper>
              ))}
            </Stack>
          )}
        </Paper>
      </Box>
    </Fade>
  );
} 