import { useEffect, useState } from "react";

function RetryRequest(){

    const [Products,setProduct] = useState([]);

    async function featchwithretry(retries=3){

        for(let i = 0 ; i < retries ; i++){

            try{
                const respo = await fetch('https://dummyjson.com/products');

                if(!respo.ok){
                    throw new Error("API Request Failed");
                }

                return respo.json();

            }catch(error){
                
                console.log(`Attempt ${i + 1} failed`);

                if(i === retries-1){
                    throw error
                }
            }
            
        }
    }

    useEffect(() => {
        async function getdata() {
            const data = await featchwithretry();
            setProduct(data.products);
        }
        getdata();
    }, []);

    return(
        <>
            <h1>Automatic Retry Component</h1>

            <ol>
                {Products.map((product) => {
                    return <li key={product.id}>{product.title}</li>
                })}
            </ol>
        </>
    )
}

export default RetryRequest