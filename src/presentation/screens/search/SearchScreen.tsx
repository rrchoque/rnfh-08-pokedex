import { View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme'
import { ActivityIndicator, Text, TextInput } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { PokemonCard } from '../../components';
import { Pokemon } from '../../../domain/entities/pokemon';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId } from '../../../actions/pokemons';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonNamesWithId(),
  });

  console.log(pokemonNameList)

  return (
    <View style={[globalTheme.globalMargin, {paddingTop: top + 10, flex: 1}]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={value => console.log(value)}
        value={'hola mundo'}
      />

      <ActivityIndicator style={{paddingTop: 20}} />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
        style={{paddingTop: top + 20}}
        showsVerticalScrollIndicator={false}
      />

    </View>
  )
}