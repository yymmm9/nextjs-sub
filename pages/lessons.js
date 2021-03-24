import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Lesson1 from '../lessons/lv1';
import Lesson2 from '../lessons/lv2.js';
import Lesson3 from '../lessons/lv3.js';
import Lesson4 from '../lessons/lv4.js';

import LoadingDots from '@/components/ui/LoadingDots';
import Button from '@/components/ui/Button';
import { useUser } from '@/utils/useUser';
import { postData } from '@/utils/helpers';


const lv1 = "prod_JAUiZkzkxcML7P";
const lv2 = "prod_JAV4smYApJOCwJ";
const lv3 = "prod_JARXNnlSvF4ruQ";
const lv4 = "prod_JAV6cqLBTmknex";

function Card({ title, description, footer, children }) {
  return (
    <div className="border border-accents-1	max-w-3xl w-full p rounded-md m-auto my-8">
      <div className="px-5 py-4">
        <h3 className="text-2xl mb-1 font-medium">{title}</h3>
        <p className="text-accents-5">{description}</p>
        {children}
      </div>
      <div className="border-t border-accents-1 bg-primary-2 p-4 text-accents-3 rounded-b-md">
        {footer}
      </div>
    </div>
  );
}
export default function Account() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLoaded, user, session, userDetails, subscription } = useUser();

//   useEffect(() => {
//     if (!user) router.replace('/signin');
//   }, [user]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    const { url, error } = await postData({
      url: '/api/create-portal-link',
      token: session.access_token
    });
    if (error) return alert(error.message);
    window.location.assign(url);
    setLoading(false);
  };

  const subscriptionName = subscription && subscription.prices.products.name;
  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription.prices.currency,
      minimumFractionDigits: 0
    }).format(subscription.prices.unit_amount / 100);

    // console.log(user);
    // console.log(subscription);
    
    const subId = subscription && subscription.prices.product_id;
    const subStatus = subscription && subscription.prices.active;

    console.log(subId);
    console.log(subStatus);

    if(subStatus == true){
      console.log(subscriptionName);

      if(subId == lv1){
        console.log("lv1");
        return (
            <section>
                <p>none here</p>
                <Lesson1 />
            </section>
        )
    }else if(subId == lv2){
        console.log("lv2");
        return (
            <section>
                <Lesson2 />
            </section>
        )
    }else if(subId == lv3){
        console.log("lv3");
        return (
            <section>
                <Lesson3 />
            </section>
        )
    }else if(subId == lv4){
        console.log("lv4");
        return (
            <section>
                <Lesson4 />
            </section>
        )
    }else{
        console.log("last");
       return(
            <section>
                <p>noneee here</p>
            </section>
       );

    }
}else{
    console.log("sub not active");
    return(
        <section>
            <p>subscription not active</p>
        </section>
    );
    }
      
  
}
