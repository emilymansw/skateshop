import styled from 'styled-components';

export const OptionValuesContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  width: 480px;
  padding: 0 8px;
  border: 1px solid #a9a9a9;
  border-radius: 6px;
  margin-bottom: 8px;
  &:focus-within {
    border: 1px solid #0052cc;
  }
  @media (max-width: 768px) {
    height: auto;
    width: 75vw;
  }
`;

export const OptionValuesInput = styled.input`
  flex: 1;
  border: none;
  height: 46px;
  margin-bottom: 0px !important;
  padding: 4px 0 0 0;
  &:focus {
    outline: transparent;
  }
`;

export const OptionValueTag = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 8px 0 0 0;
`;

export const TagsContainer = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 6px;
  margin: 0 8px 8px 0;
  background: #0052cc;
`;

export const TagTitle = styled.span`
  margin-top: 3px;
`;

export const TagCloseIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 8px;
  color: #0052cc;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
`;
