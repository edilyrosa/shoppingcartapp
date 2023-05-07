import CrudTableRow from './CrudTableRow';
function CrudTable({data, setDataToEdict, deleteData}) {
    return ( 
        <div>
            <br/>
        <h2 >CATALOGUE</h2>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>description</th>
                    <th>price</th>
                    <th>img</th>
                    <th>Action</th>
                </tr>
            </thead>


            <tbody>
                {
                    data.length > 0 
                    ? data.map((e,index) => 
                    <CrudTableRow key={index} register={e} setDataToEdict={setDataToEdict} deleteData={deleteData} /> ) 
                    :<tr> 
                    <td colSpan='5'> No data </td> 
                </tr> 
                }
            </tbody>

        </table>
        </div>
                </div>
     );
}

export default CrudTable;