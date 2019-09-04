import fetch from 'isomorphic-unfetch'
import Cookies from 'universal-cookie';


export default async function Fetch(url,method='GET',body=''){
    const cookies = new Cookies();
    const Token=cookies.get('Token')
    console.log(cookies.get('Token').value)
    const res_object = {
      method: method,
      headers: {
        "Content-type":"application/x-www-form-urlencoded",
        'Accept': 'application/json',
        'Token' : Token
      }
    }
    if(method != 'GET')
      res_object.body=body

    const res=fetch(url,res_object).then()
    return res  
}

