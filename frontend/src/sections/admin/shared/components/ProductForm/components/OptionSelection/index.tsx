import React, { useEffect, useState } from 'react';
import {
  OptionValuesContainer,
  OptionValuesInput,
  OptionValueTag,
  TagsContainer,
  TagTitle,
  TagCloseIcon,
} from './styles';
import { Dropdown } from '../Dropdown';
import { IOptionFamilyData } from '../../../../../../../types/product';
import { SmButton } from '../../../../../../shared/UI/SharedUI';

interface IOptionData {
  optionFamily: string;
  optionValues: string[];
}

export const OptionSelection = ({
  existingOptionFamilies,
  optionValues,
  setOptionValues,
  optionFamily,
  setOptionFamily,
  optionsIndex,
  optionCount,
  setOptionCount,
  setOptions,
  options,
}: {
  existingOptionFamilies: IOptionFamilyData[];
  optionValues: string[][];
  setOptionValues: React.Dispatch<React.SetStateAction<string[][]>>;
  optionFamily: IOptionFamilyData[];
  setOptionFamily: React.Dispatch<React.SetStateAction<IOptionFamilyData[]>>;
  optionsIndex: number;
  optionCount: number;
  setOptionCount: React.Dispatch<React.SetStateAction<number>>;
  setOptions: React.Dispatch<React.SetStateAction<IOptionData[]>>;
  options: IOptionData[];
}) => {
  const [inputValue, setInputValue] = useState('');
  const addOptionValue = () => {
    if (inputValue !== '' && !optionValues[optionsIndex].includes(inputValue)) {
      const allOptionValuesCopy = [...optionValues];
      const optionFamilyCopy = [...optionFamily];
      const optionValuesCopy = allOptionValuesCopy[optionsIndex];
      allOptionValuesCopy[optionsIndex] = [...optionValuesCopy, inputValue];
      setOptionValues(allOptionValuesCopy);
      optionFamilyCopy[optionsIndex] = {
        ...optionFamilyCopy[optionsIndex],
        optionValues: allOptionValuesCopy[optionsIndex],
      };
      setOptionFamily(optionFamilyCopy);
      setInputValue('');
    }
  };
  const removeOptionValue = (indexToRemove: number) => {
    const optionFamilyCopy = [...optionFamily];
    const optionValuesCopy = [...optionValues];
    optionValuesCopy[optionsIndex] = optionValuesCopy[optionsIndex].filter(
      (_, index) => index !== indexToRemove
    );
    optionFamilyCopy[optionsIndex] = {
      ...optionFamilyCopy[optionsIndex],
      optionValues: optionValuesCopy[optionsIndex],
    };
    setOptionFamily(optionFamilyCopy);
    setOptionValues([...optionValuesCopy]);
  };

  useEffect(() => {
    if (optionFamily[optionsIndex]) {
      const optionValuesCopy = [...optionValues];
      optionValuesCopy[optionsIndex] = optionFamily[optionsIndex].optionValues;
      setOptionValues(optionValuesCopy);
    }
  }, [optionFamily[optionsIndex]]);

  const removeOption = () => {
    setOptionFamily([...optionFamily].filter((_, i) => i !== optionsIndex));
    setOptionValues([...optionValues].filter((_, i) => i !== optionsIndex));
    setOptionCount(optionCount - 1);
    setOptions([...options].filter((_, i) => i !== optionsIndex));
  };

  return (
    <div>
      <div>
        <span>Option </span>
        {optionsIndex !== 0 && (
          <span>
            <SmButton type="submit" onClick={removeOption}>
              remove option
            </SmButton>
          </span>
        )}
        <Dropdown
          items={existingOptionFamilies}
          setSelectedItem={setOptionFamily}
          selection={optionFamily}
          index={optionsIndex}
          type="optionFamily"
          selectedItem={optionFamily[optionsIndex]}
        />
      </div>
      <div>
        <label>
          Option Value:
          <OptionValuesContainer>
            {optionValues[optionsIndex] !== undefined &&
              Object.keys(optionValues[optionsIndex]).length > 0 &&
              optionValues[optionsIndex].map((optionValue, index) => (
                <OptionValueTag key={index}>
                  <TagsContainer>
                    <TagTitle>{optionValue}</TagTitle>
                    <TagCloseIcon onClick={() => removeOptionValue(index)}>
                      x
                    </TagCloseIcon>
                  </TagsContainer>
                </OptionValueTag>
              ))}

            <OptionValuesInput
              placeholder="Press enter to add option value"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              onKeyUp={(e) => (e.key === 'Enter' ? addOptionValue() : null)}
            />
          </OptionValuesContainer>
        </label>
      </div>
    </div>
  );
};
