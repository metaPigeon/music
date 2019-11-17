import styled from 'styled-components'
import styles from '@/assets/global-style.js'

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 5px 10px;
  background: ${styles["theme-color"]};
  & >span {
      font-size: 20px;
      line-height: 40px;
      color: white;
      &.iconfont {
          font-size: 25px;
      }
  } 
`
const Tab = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${styles["theme-color"]};
  height: 44px;
  a {
      font-size: 14px;
      dispaly: flex;
      padding: 2px 0;
      color: #e4e4e4;
      flex: 1;
      &.actived {
          span {
              padding: 3px 0;
              font-weight: 700;
              color: #f1f1f1;
              border-bottom: 2px solid #f1f1f1;
          }
      }
  }
`

const TabItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

export {Top, Tab, TabItem}