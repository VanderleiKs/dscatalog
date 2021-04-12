import { UserResponse } from "core/types/UserTypes";
import { makePrivateRequest } from "core/utils/Request";
import { useEffect, useState } from "react";
import CardUser from "../CardUser";
import './styles.scss';


const ListUsers = () => {
    const [users, setUsers] = useState<UserResponse>();
    const gerarRelatorio = () => {
        makePrivateRequest({url: '/report', method: 'POST', relatory: true})
        ?.then(response => {
            var file = new Blob([response.data], {type: "application/pdf"});
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL, "janela1",
        "width=800, height=600, directories=no, "
        + "location=no, menubar=no,scrollbars=no, status=no, toolbar=no, resizable=no");
        });
    }

    useEffect(() => {
        makePrivateRequest({ url: '/users' })
            ?.then((response) => setUsers(response.data));
    }, []);

    return (
        <>
            <div className="">
                    <button className="btn btn-primary" onClick={gerarRelatorio}>Gerar Relatório</button>

            </div>
            <div className="admin-container-cards">
                {users?.content.map((user) => (
                    <CardUser key={user.id} name={user.firstName} />
                ))}

            </div>
        </>
    )
};
export default ListUsers;