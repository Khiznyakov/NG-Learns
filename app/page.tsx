"use client";
import { Box, Typography, Button, TextField, Paper, Slide, Fade } from "@mui/material";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    // Главная страница LMS для авторизованных
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#181818', letterSpacing: 1 }}>
          Добро пожаловать в NG Learn!
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, textAlign: 'center', mb: 4, color: '#181818', fontWeight: 400 }}>
          Ваша корпоративная система управления обучением. Здесь вы найдете курсы, иерархию сотрудников и личный кабинет для отслеживания прогресса.
        </Typography>
      </Box>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Введите логин и пароль");
      return;
    }
    const ok = login(username, password);
    if (!ok) {
      setError("Неверный логин или пароль");
    } else {
      setError("");
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      minWidth: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      p: 0,
      m: 0,
    }}>
      {/* Фоновое изображение на всю страницу */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'url(/poly-bg01.jpg) center/cover no-repeat',
        zIndex: 0,
        p: 0,
        m: 0,
      }} />
      {/* Затемнение для читаемости */}
      <Box sx={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255,255,255,0.7)',
        zIndex: 1,
        p: 0,
        m: 0,
      }} />
      {/* Форма авторизации */}
      <Fade in timeout={2000}>
        <Slide in direction="up" timeout={2000}>
          <Box sx={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 420, p: 0 }}>
            <Paper elevation={3} sx={{ p: 5, minWidth: 340, maxWidth: 400, width: '100%', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)', borderRadius: 4, transition: 'background 0.3s' }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#181818', textAlign: 'center' }}>
                NG Learn
              </Typography>
              <Typography sx={{ mb: 4, color: '#181818', textAlign: 'center' }}>
                Ваша корпоративная система управления обучением. Здесь вы найдете курсы, иерархию сотрудников и личный кабинет для отслеживания прогресса.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Логин</Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  autoFocus
                />
                <Typography sx={{ fontWeight: 500, mb: 0.5, mt: 2 }}>Пароль</Typography>
                <TextField
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ mt: 3 }}>
                  Войти
                </Button>
              </form>
            </Paper>
          </Box>
        </Slide>
      </Fade>
    </Box>
  );
}
