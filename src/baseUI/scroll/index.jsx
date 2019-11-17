
import React, {useState, useRef, useEffect, forwardRef, useMemo, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import BScroll from 'better-scroll'
import styled from 'styled-components'
import Loading from '@/baseUI/loading/index'
import LoadingV2 from  '@/baseUI/loading-v2/index'
import {debounce} from '@/api/utils.js'


const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const PullUpLoading = styled.div`
  position: absolute;
  left:0; right:0;
  bottom: 5px;
  width: 60px;
  height: 60px;
  margin: auto;
  z-index: 100;
`;

 const PullDownLoading = styled.div`
  position: absolute;
  left:0; right:0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState();
    const scrollContaninerRef = useRef();
    const { direction, click, refresh, bounceTop, bounceBottom, pullUpLoading, pullDownLoading } = props;
    const { pullUp, pullDown, onScroll } = props;

    useEffect(() => {
        const scroll = new BScroll(scrollContaninerRef.current, {
            scrollX: direction === "horizental",
            scrollY: direction === "vertical",
            probeType: 3,
            click: click,
            bounce :{
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    },[])

    let pullUpDebounce = useMemo(() => {
        return debounce(pullUp, 300)
    }, [pullUp]);

    let pullDownDebounce = useMemo(() => {
        return debounce(pullDown, 300)
    }, [pullDown]);

    useEffect(() => {
        if(refresh && bScroll) {
            bScroll.refresh()
        }
    })

    useEffect(()=> {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
        onScroll(scroll)
    })
    return () => {
        bScroll.off('scroll')
    }
    },[onScroll, bScroll])

    useEffect(() => {
        if(!bScroll || !pullUp) return;
        bScroll.on('scrollEnd', ()=>{
            if(bScroll.y<=bScroll.maxScrollY + 100){
                pullUpDebounce();
            }
        })
        return () => {
            bScroll.off('scrollEnd')
        }
    }, [pullUp, bScroll, pullUpDebounce])
    
    useEffect(() => {
        if(!bScroll || !pullDown) return
        bScroll.on('touchEnd', (pos) => {
            if(pos.y > 50){
                pullDownDebounce()
            }
        })
        return () => {
            bScroll.off('touchEnd')
        }
    }, [pullDown, bScroll, pullDownDebounce])

    useImperativeHandle(ref, () => ({
        refresh() {
            if (bScroll) {
                bScroll.refresh();
                bScroll.scrollTo(0, 0);
            }
        },
        getBScroll() {
            if (bScroll) {
                return bScroll;
            }
        }
    }))
    const PullUpdisplayStyle = pullUpLoading? { display: ''} : {display: 'none' }
    const PullDowndisplayStyle = pullDownLoading? {display: ''} : {display: 'none'}
    return (
        <ScrollContainer ref={scrollContaninerRef}>
            {props.children}
            <PullUpLoading style={PullUpdisplayStyle}><Loading></Loading></PullUpLoading>
            <PullDownLoading style={PullDowndisplayStyle}><LoadingV2></LoadingV2></PullDownLoading>
        </ScrollContainer>
    )
})

Scroll.propTypes ={
    direction: PropTypes.oneOf(['vertical','horizental']),
    click: PropTypes.bool,
    refresh: PropTypes.bool,
    onScroll: PropTypes.func,
    pullUp: PropTypes.func,
    pullDown: PropTypes.func,
    pullUpLoading: PropTypes.bool,
    pullDownLoading: PropTypes.bool,
    bounceTop: PropTypes.bool,
    bounceBottom: PropTypes.bool,
}
Scroll.defaultProps= {
   direction: "vertical",
   click: true,
   refresh: true,
   onScroll: null,
   pullDown: null,
   pullUp: null,
   pullDownLoading: false,
   pullUpLoading: false,
   bounceTop: true,
   bounceBottom: true
}


export default Scroll