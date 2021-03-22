import './styles.scss';

type Props = {
    name: string
}

const CardCategories = ({name}: Props) => {
 
    return(
        <h2 className="card-base border-radius-10 card-categories">{name}</h2>
    );
}

export default CardCategories;