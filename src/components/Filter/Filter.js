import { Input, Label } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterAction } from 'redux/filterSlice';
import { filterSelector } from 'redux/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  return (
    <Label>
      Find contacts by name:
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={e => dispatch(filterAction(e.target.value))}
      />
    </Label>
  );
};
