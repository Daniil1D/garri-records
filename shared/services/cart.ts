import { axiosInstance } from './instance';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>('/api/cart')).data;
};

export const updateItemQuantity = async (id: string, quantity: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(`/api/cart/${id}`, { quantity })).data;
};

export const removeCartItem = async (id: string): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(`/api/cart/${id}`)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>('/api/cart', values)).data;
};