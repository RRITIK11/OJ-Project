import Problem from '@/models/problem.model'
import React from 'react'

async function Page() {
  let problems : any = await Problem.find({});
  return (
    <main>
      <h1>Todos</h1>
      <ul>
        {
          problems?.map((problem : any)=>{
            return <li key={problem._id}>
              {problem.title}
            </li>
          })
        }
      </ul>
    </main>
  );
}

export default Page