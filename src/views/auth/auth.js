import {useRouter} from 'next/router'

const useAuth = () => {
    if(typeof window !=='undefined'){
        const userToken = sessionStorage.getItem('userToken');
        const router = useRouter();
          if(!userToken){
            router.push('/pages/login')
            return null;
          }
        }
  return ;
}

export default useAuth

