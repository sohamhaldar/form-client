'use client'
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()
  return (
    <div class="bg-cover w-screen h-screen flex justify-center items-center relative " style={{ backgroundImage: 'url(/cool-background.png)' }}>
    <div className='absolute h-[95%] w-[90%] p-0 flex justify-center items-center' >
      <img src="/cloud.svg" alt="" className="w-full h-full bg-clip-content absolute" />
      <div className='absolute h-[50%] w-[50%] flex flex-col justify-center items-center' >
        <div className="flex justify-center">
          <div className="w-[20%]"></div>
          <h1 className=" font-Lilita tracking-wider text-5xl font-extrabold bg-gradient-to-r from-rose-600 to-purple-700 bg-clip-text text-transparent ">Table &nbsp;Creator</h1>
        </div>
      
        <div className="h-[50%] w-full flex justify-center items-center">
            <button onClick={()=>router.push('/table')} className=" bg-slate-50 rounded-lg p-4 border border-b-2 border-slate-800 tracking-wide font-bold text-slate-600">Create Now</button>
        </div>
      </div>
    </div>
    
    
    </div>
  );
}
