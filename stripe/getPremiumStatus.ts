import { auth, db } from '@/firebase';
import { getDocs, collection, query, where, orderBy } from 'firebase/firestore';

export const getSubscriptionStatus = async (userId: string) => {
  try {
    const collectionRef = collection(db, 'customers', userId, 'subscriptions');

    const querySnapshot = query(
      collectionRef,
      where('status', 'in', ['trialing', 'active']),
      orderBy('created', 'desc')
    );

    const userSubscriptions = await getDocs(querySnapshot);

    // In this example, we only expect one active or trialing subscription to exist.
    if (userSubscriptions.docs.length === 0) {
      return null;
    } else {
      const subscription = userSubscriptions.docs[0].data();

      return subscription.items[0].price.product.name;
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};
