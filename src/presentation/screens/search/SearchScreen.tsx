import { View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { FullScreenLoader, PokemonCard } from '../../components';
import { Pokemon } from '../../../domain/entities/pokemon';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  // Todo: aplicar debounce
  const pokemonNameIdList = useMemo(() => {
    // Es un número
    if (!isNaN(Number(term))) {
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(term),
      );

      return pokemon ? [pokemon]:[]
    }

    if (term.length === 0) return [];
    if (term.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(term.toLocaleLowerCase()),
    );

  }, [term]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10, flex: 1}]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        style={{paddingTop: top + 20}}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ <View style={{ height: 150 }} />}
      />

    </View>
  )
}