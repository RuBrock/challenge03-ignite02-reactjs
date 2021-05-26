import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const newCart = [...cart];
      const productAlreadyExists = newCart.find(product => product.id === productId);
      const currentAmount = productAlreadyExists ? productAlreadyExists.amount : 0;
      const amountToAdd = currentAmount + 1;

      const hasStock = await checkProductStock({ productId, amount: amountToAdd });
      if(!hasStock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (productAlreadyExists) {
        productAlreadyExists.amount = amountToAdd;
      } else {
        const product = await api.get(`/products/${productId}`);
        const newProduct = {
          ...product.data,
          amount: 1
        }

        newCart.push(newProduct);
      }

      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const newCart = [...cart];
      const indexProductRemove = newCart.findIndex(product => product.id === productId);
      if(indexProductRemove < 0) {
        throw new Error();
      } 
      newCart.splice(indexProductRemove, 1);

      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    if(amount <= 0) return false;
    try {
      const newCart = [...cart];
      const productCart = newCart.find(product => product.id === productId);

      const hasStock = await checkProductStock({ productId, amount });
      if(!hasStock) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      if (productCart) {
        productCart.amount = amount;

        setCart(newCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  const checkProductStock = async ({productId, amount}: UpdateProductAmount) => {
    const productStock = await api.get(`/stock/${productId}`);
    const productStockAmount = productStock.data.amount;
    
    if(amount > productStockAmount) {
      return false;
    }

    return true
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
