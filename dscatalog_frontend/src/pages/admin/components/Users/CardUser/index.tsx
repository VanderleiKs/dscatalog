import './styles.scss';

type Props = {
    name: string;
}

const CardUser = ({name}: Props) => {

    return (
        <div className="card-base cardUser-container-base col-12">
            <h1 className="cardUser-title col-6">{name}</h1>
            <div className="col-3">
                <button className="btn btn-outline-secondary justify-content-between btn-block border-radius-10">EDITAR</button>
            </div>
            <div className="col-3">
                <button className="btn btn-outline-danger justify-content-between btn-block border-radius-10">EXCLUIR</button>
            </div>
        </div>

    )
};
export default CardUser;