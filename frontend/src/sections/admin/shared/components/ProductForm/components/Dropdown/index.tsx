import React, { useState } from 'react';
import { DropdownSelect } from './styles';
import { IBrandData } from '../../../../../../../types/brand';
import {
  ICategoryData,
  IOptionFamilyData,
} from '../../../../../../../types/product';

type DropdownPropsType =
  | {
      items: ICategoryData[];
      setSelectedItem: React.Dispatch<
        React.SetStateAction<ICategoryData | undefined>
      >;
      type: 'category';
      selectedItem: ICategoryData | undefined;
    }
  | {
      items: IBrandData[];
      setSelectedItem: React.Dispatch<
        React.SetStateAction<IBrandData | undefined>
      >;
      type: 'brand';
      selectedItem: IBrandData | undefined;
    }
  | {
      items: IOptionFamilyData[];
      setSelectedItem: React.Dispatch<
        React.SetStateAction<IOptionFamilyData[]>
      >;
      selection: IOptionFamilyData[];
      type: 'optionFamily';
      index: number;
      selectedItem: IOptionFamilyData | undefined;
    };

export const Dropdown = (props: DropdownPropsType) => {
  const { items, setSelectedItem, type, selectedItem } = props;
  const [disabled, setDisabled] = useState<boolean>();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (type === 'optionFamily') {
      const { selection, index } = props;
      const selectionCopy = [...selection];
      selectionCopy[index] = items.find(
        (i) => i.name === e.target.value
      ) as IOptionFamilyData;
      setSelectedItem(selectionCopy);
    } else if (type === 'brand') {
      setSelectedItem(items.find((i) => i.name === e.target.value));
    } else if (type === 'category') {
      setSelectedItem(items.find((i) => i.name === e.target.value));
    }
  };

  return (
    <DropdownSelect
      onChange={(e) => {
        handleChange(e);
        setDisabled(true);
      }}
      value={selectedItem?.name || '--select--'}
    >
      <option disabled={disabled} key="" value="">
        --select--
      </option>
      {items.map((item, i) => (
        <option key={i} value={item.name}>
          {item.name}
        </option>
      ))}
    </DropdownSelect>
  );
};
