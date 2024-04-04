import { Search } from "lucide-react";

export function AttendeeList() {
  return (
    <div>
      <div className='flex items-center gap-3 '>
        <h1 className='text-2xl font-bold'>Participantes</h1>
        <div className='w-72 px-3 py-1.5 border border-white/10 bg-transparent rounded-lg text-sm flex items-center gap-3'>
          <Search className='size-4 text-emerald-300' />
          <input
            className='bg-transparent flex-1 outline-none'
            placeholder='Buscar participante...'
          />
        </div>
      </div>
      <div className='border border-white/10 rounded-lg'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>
                <input type='checkbox' />
              </th>
              <th>Código</th>
              <th>Participante</th>
              <th>Data de inscrição</th>
              <th>Data de check-in</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type='checkbox' />
              </td>
              <td>12344</td>
              <td>
                <div>
                  <span>Evandro Costa</span>
                  <span>evandro@email.com</span>
                </div>
              </td>
              <td>7 dias atrás</td>
              <td>3 dias atrás</td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Mostrando 10 de 120 itens</td>
              <td colSpan={3}>Página 1 de 12</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
