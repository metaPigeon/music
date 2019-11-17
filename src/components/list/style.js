import styled from 'styled-components'
import style from '@/assets/global-style'

const ListWrapper = styled.div`
   max-width: 100%;
   .title {
     font-weight: 700;
     padding-left: 6px;
     font-size: 14px;
     line-height: 60px;
     color: ${style['font-color']}
   }
`

const List = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
`

const ListItem = styled.div`
   position: relative;
   flex-basis: 32%;
   .img_wrapper{
     position: relative;
     height: 0px;
     padding-bottom: 100%;
     .decorate{
       z-index: 1;
       position: absolute;
       top: 0;
       width: 100%;
       height: 35px;
       border-radius: 3px;
       background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));

     }
    img{
     position: absolute;
     width: 100%;
     height: 100%
     border-radius: 3px;
   }
   .play_count {
     position: absolute;
     top: 2px;
     right: 2px;
     font-size: ${style["font-size-s"]};
     line-height: 15px;
     color: rgb(241,241,241);
      .play{
        vertical-align: top;
      }
   }
  }
   .desc {
     margin-top: 2px;
     height: 50px;
     text-align: left;
     line-height: 1.4;
     color: ${style["font-size-s"]};
     font-size: ${style["font-size-s"]};
     overflow: hidden;
     padding: 0 2px;
   }
`

export {
  ListWrapper,
  List,
  ListItem
}