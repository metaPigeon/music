import styled from 'styled-components'
import style from '@/assets/global-style'

export const NavContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 95px;
  width: 100%;
  padding: 5px;
  overflow: hidden;
`

export const List = styled.div`
  dispaly: flex;
  margin: auto;
  overflow: hidden;
`
export const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  left: 0;
  bottom: 0;
  // height: 576px;
  overflow: hidden;
  width: 100%;
`

export const ListItem = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
    margin: 0 5px;
  padding: 5px 0;
    border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radious: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name{
    font-size: 14px;
    color: rgb(46, 48, 48);
    font-weight: 500;
  }
`