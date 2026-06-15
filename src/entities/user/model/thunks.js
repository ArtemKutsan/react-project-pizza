import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserById } from '../api/getUserById';

// Загружает пользователя по ID через API-границу сущности User
export const fetchUserById = createAsyncThunk('users/fetchUserById', getUserById);
