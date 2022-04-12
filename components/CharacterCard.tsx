import styles from '../styles/Home.module.css'
import { Character } from '../services/types/characterType';

interface ICharacterCard {
    character: Character
}
const CharacterCard = (props: ICharacterCard) => {

    const { character } = props;

    return (
        <a href={'/' + character.id} className={styles.card}>
            <div>
                <img  src={character.thumbnail?.path + '.' + character.thumbnail?.extension} />
                {character.name}
            </div>
        </a>
    )
}

export default CharacterCard
