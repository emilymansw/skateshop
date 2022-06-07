import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { usePostOptionFamily } from '../../../../../api/APIService';
import {
  ModalContainer,
  Close,
} from '../../../../storefront/SkateboardBuilder/components/ProductModal';
import { Button } from '../../../../shared/UI/SharedUI';

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: 80%;
  flex-direction: column;
`;

export const CreationModal = ({
  display,
  setDisplay,
  refetchOptionFamily,
}: {
  display: boolean;
  setDisplay: React.Dispatch<SetStateAction<boolean>>;
  refetchOptionFamily: (
    fetchPath: string,
    fetchParams: object,
    fetchRequestData: object
  ) => void;
}) => {
  const [optionName, setOptionName] = useState<string>('');
  const [optionValues, setOptionValues] = useState<string>('');
  const { fetchData, data, loading, error } = usePostOptionFamily();

  useEffect(() => {
    if (data) {
      refetchOptionFamily('', {}, {});
    }
  }, [data]);

  const createOptionFamily = () => {
    if (optionName.trim().length > 0 && optionValues.trim().length > 0) {
      fetchData(
        '',
        {},
        {
          name: optionName,
          optionValues: optionValues.split(','),
        }
      );
    }
  };
  return (
    <ModalContainer className={`${display ? 'show' : ''}`}>
      <Close
        onClick={() => {
          setDisplay(false);
        }}
      >
        &times;
      </Close>
      <InnerContainer>
        {data && <p>Successfully created option family #{data.id}</p>}
        <p>Option Name</p>
        <input
          type="text"
          value={optionName}
          onChange={(e) => {
            setOptionName(e.target.value);
          }}
        />
        <p>Option Values (separate them by comma e.g. red,blue)</p>
        <input
          type="text"
          value={optionValues}
          onChange={(e) => {
            setOptionValues(e.target.value);
          }}
        />
        <Button type="submit" onClick={createOptionFamily}>
          Create Option Family
        </Button>
      </InnerContainer>
    </ModalContainer>
  );
};
