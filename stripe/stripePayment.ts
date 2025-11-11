import { app, auth, db } from '@/firebase';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { getFunctions, httpsCallable } from '@firebase/functions';

export const loadCheckout = async (priceId: string) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const collectionRef = collection(db, 'customers', user.uid, 'checkout_sessions');

    const addCurrentCheckout = await addDoc(collectionRef, {
      price: priceId,
      allow_promotion_codes: true,
      success_url: window.location.href,
      cancel_url: window.location.href,
    });

    const currentCheckoutRef = doc(collectionRef, addCurrentCheckout.id);

    const unsubscribe = onSnapshot(currentCheckoutRef, snapshot => {
      const currentCheckoutData = snapshot.data();

      if (currentCheckoutData?.url === undefined) {
        return;
      }

      window.location.assign(currentCheckoutData.url);

      unsubscribe();
    });
  } catch (error: any) {
    alert(error.message);
  }
};

export const loadPortal = async () => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const instance = getFunctions(app, 'us-central1');
    const functionRef = httpsCallable(instance, 'ext-firestore-stripe-payments-createPortalLink');

    const { data } = await functionRef({
      returnUrl: window.location.href,
    });

    window.location.assign((data as { url: string }).url);
  } catch (error) {
    alert(error);
  }
};
