import styles from '../styles/Home.module.css'
import { useLazyGetCharactersQuery } from '../services/mainApi';
import { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import Paginate from '../components/Pagination';

const CharactersProvider = () => {
    const [page, setPage] = useState<number>(0)
    const [search, setSearch] = useState<string>('')

    const [trigger, { isError, data, isLoading, isSuccess }] = useLazyGetCharactersQuery();


    useEffect(() => {
        trigger({
            limit: 10,
            offset: page * 10,
            name: search
        })
    }, [page])

    const searchHandler = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        trigger({
            limit: 10,
            offset: page * 10,
            name: search
        })
    }

    const characterMapped = useMemo(() => {
        return data && data.results && data.results.map(character => {
            return <CharacterCard character={character} key={character.id} />
        })
    }, [data, isSuccess]);

    return (

        <div>
            <form onSubmit={searchHandler} method='POST'>
                <input type={'text'} name='name' onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value)} />
                <button>Search</button>
                <p>It search nameStartWith (for example, SP)</p>
            </form>
            <div className={styles.grid}>
                {isLoading && "Loading..."}
                {characterMapped}
            </div>
            {isSuccess && data && data.total > 0 && <Paginate total={data?.total} perPage={data?.limit} setPage={setPage} />}
            {data && data.total <= 0 && 'No data...'}
        </div>

    )
}

export default CharactersProvider
