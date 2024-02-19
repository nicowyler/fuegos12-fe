import { axiosPrivate } from "@/api/axios"
import { useEffect } from "react"

const Home = () => {

    const getUsers = async ()=>{
        const response = await axiosPrivate.get('api/user');
        console.log(response)
    }

    useEffect(()=>{
        getUsers();
    },[])

    return (
        <section>
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="card w-1/3 h-72 m-2 border border-gray-300 rounded-xl shadow-md">
                    <img src="carbon.jpg" alt="Carbón" className="w-full h-48 object-cover rounded-t-xl"/>
                        <div className="p-4">
                            <p className="font-bold text-xl mb-2">Carbón de 8kg</p>
                            <p className="text-red-500 text-lg mb-2">$2.500</p>
                            <a href="#" className="block w-full h-10 bg-gray-900 text-white text-lg text-center leading-10 rounded-b-xl cursor-pointer">Comprar ahora</a>
                        </div>
                </div>
                <div className="card w-1/3 h-72 m-2 border border-gray-300 rounded-xl shadow-md">
                    <img src="lena.jpg" alt="Leña" className="w-full h-48 object-cover rounded-t-xl"/>
                        <div className="p-4">
                            <p className="font-bold text-xl mb-2">Leña quebracho colorado x10kg</p>
                            <p className="text-red-500 text-lg mb-2">$1.500</p>
                            <a href="#" className="block w-full h-10 bg-gray-900 text-white text-lg text-center leading-10 rounded-b-xl cursor-pointer">Comprar ahora</a>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Home
