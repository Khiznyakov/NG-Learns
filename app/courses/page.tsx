"use client";
import { useState } from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, Chip, LinearProgress, Stack, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const COURSES = [
  {
    id: 1,
    title: "Основы управления",
    description: "Курс для руководителей о современных методах управления персоналом.",
    duration: 120,
    category: "Управляющие",
    icon: <SupervisorAccountIcon fontSize="large" color="primary" />,
    progress: 100,
  },
  {
    id: 2,
    title: "Стандарты обслуживания",
    description: "Обязательный курс для официантов по стандартам сервиса.",
    duration: 60,
    category: "Официанты",
    icon: <RestaurantIcon fontSize="large" color="success" />,
    progress: 40,
  },
  {
    id: 3,
    title: "Безопасность на кухне",
    description: "Курс для поваров по технике безопасности и санитарии.",
    duration: 90,
    category: "Повара",
    icon: <LocalDiningIcon fontSize="large" color="warning" />,
    progress: 0,
  },
  {
    id: 4,
    title: "Введение в корпоративную культуру",
    description: "Общий курс для всех сотрудников о ценностях компании.",
    duration: 30,
    category: "Все",
    icon: <SchoolIcon fontSize="large" color="info" />,
    progress: 100,
  },
];

const CATEGORIES = ["Все", "Управляющие", "Повара", "Официанты"];

export default function CoursesPage() {
  const [category, setCategory] = useState("Все");
  const [duration, setDuration] = useState("all");

  const filtered = COURSES.filter(c =>
    (category === "Все" || c.category === category || c.category === "Все") &&
    (duration === "all" || (duration === "short" && c.duration <= 60) || (duration === "medium" && c.duration > 60 && c.duration <= 90) || (duration === "long" && c.duration > 90))
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#181818' }}>
        Курсы
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Назначение</InputLabel>
          <Select value={category} label="Назначение" onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Время прохождения</InputLabel>
          <Select value={duration} label="Время прохождения" onChange={e => setDuration(e.target.value)}>
            <MenuItem value="all">Любое</MenuItem>
            <MenuItem value="short">До 1 часа</MenuItem>
            <MenuItem value="medium">1-1.5 часа</MenuItem>
            <MenuItem value="long">Более 1.5 часов</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
          gap: 3,
        }}
      >
        {filtered.map(course => {
          const completed = course.progress === 100;
          return (
            <Box key={course.id}>
              <Card
                sx={{
                  opacity: completed ? 0.5 : 1,
                  pointerEvents: 'auto',
                  boxShadow: completed ? 1 : 3,
                  border: completed ? '2px solid #bdbdbd' : 'none',
                  position: 'relative',
                  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s, background 0.3s',
                  '&:hover': {
                    boxShadow: '0 12px 36px 0 rgba(100, 150, 255, 0.18)',
                    transform: 'translateY(-2px) scale(1.02)',
                  },
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  height: 340,
                  background: 'rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(18px)',
                  boxShadow: '0 8px 32px 0 rgba(100, 150, 255, 0.10)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>{course.icon}</Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{course.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>{course.description}</Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Chip label={course.category} size="small" color="primary" />
                    <Typography variant="caption" color="text.secondary">
                      {course.duration} мин
                    </Typography>
                  </Stack>
                  {course.progress > 0 && course.progress < 100 && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress variant="determinate" value={course.progress} />
                      <Typography variant="caption" color="text.secondary">
                        Прогресс: {course.progress}%
                      </Typography>
                    </Box>
                  )}
                  {completed && (
                    <Chip label="Пройдено" color="success" sx={{ mt: 2 }} />
                  )}
                </CardContent>
                <CardActions sx={{ mt: 'auto', p: 0 }}>
                  <Button size="small" variant="contained" color={completed ? "inherit" : "primary"} disabled={false} fullWidth onClick={() => {}}>
                    {completed ? "Просмотреть" : course.progress > 0 ? "Продолжить" : "Начать"}
                  </Button>
                </CardActions>
                {completed && (
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: '#fff',
                    borderRadius: '50%',
                    width: 16,
                    height: 16,
                  }} />
                )}
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
} 