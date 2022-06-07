import styled from 'styled-components';
import { MdCancel } from 'react-icons/md';

export const DropZone = styled.div`
  p {
    height: 50px;
    line-height: 50px;
  }
  @media (max-width: 768px) {
    p {
      height: 25px;
      line-height: 25px;
    }
  }
  text-align: center;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #a9a9a9;
  height: 80px;
  margin-bottom: 8px;
  &.active {
    border: dotted;
  }
`;

export const PreviewImageContainer = styled.div`
  display: flex;
`;

export const PreviewImage = styled.img`
  height: 180px;
  width: auto;
`;

export const Remove = styled(MdCancel)`
  position: absolute;
  top: -5px;
  right: -5px:
  padding: 5px;
  border-radius: 10px;
  background-color: white;
`;

export const PreviewImageWrapper = styled.div`
  position: relative;
`;
