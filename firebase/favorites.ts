import { db, auth } from '@/firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { Movie } from '@/types';

export const addFavorite = async (movie: Movie) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const favoriteRef = doc(db, 'favorites', user.uid, 'movies', movie.id);

    await setDoc(favoriteRef, {
      ...movie,
    });
  } catch (error: any) {
    alert(error.message);
  }
};

export const deleteFavorite = async (movie: Movie) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const favoriteRef = doc(db, 'favorites', user.uid, 'movies', movie.id);
    await deleteDoc(favoriteRef);
  } catch (error: any) {
    alert(error.message);
  }
};

export const getFavorites = async () => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const favoriteRef = collection(db, 'favorites', user.uid, 'movies');
    const snapshot = await getDocs(favoriteRef);
    return snapshot.docs.map(doc => doc.data() as Movie)
  } catch (error: any) {
    alert(error.message);
  }
};

export const isFavorite = async (movie: Movie) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const favoriteRef = doc(db, 'favorites', user.uid, 'movies', movie.id);
    const snapshot = await getDoc(favoriteRef);
    return snapshot.exists();
  } catch (error: any) {
    alert(error.message);
  }
};

export const toggleFavorite = async (movie: Movie) => {
  const isFav = await isFavorite(movie);
  
  if (isFav) {
    await deleteFavorite(movie);
  } else {
    await addFavorite(movie);
  }
  
  return !isFav; 
};
