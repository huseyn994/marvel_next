import styles from '../styles/Home.module.css'
import { useGetCharacterQuery, useLazyGetCharactersQuery } from '../services/mainApi';
import { Url } from '../services/types/characterType';


const CharacterInProvider = ({
    characterId
}: {
    characterId: string
}) => {

    const { data } = useGetCharacterQuery({
        character: characterId
    });

    const renderUrls = (url: Url[]) => {
        if (url.length === 0) {
            return null;
        }
        return (<ul>{
            url.map(url => {
                return <li key={url.url}>{url.url}</li>
            })
        }
        </ul>)
    }

    const comic = data?.results[0];
    return (

        <div>
            {comic &&
                <div>
                    <h1>{comic.name}</h1>
                    <img style={{ maxWidth: '300px' }} src={comic.thumbnail?.path + '.' + comic.thumbnail?.extension} />

                    {renderUrls(comic?.urls)}
                    <div></div>
                </div>
            }
        </div>

    )
}

export default CharacterInProvider
