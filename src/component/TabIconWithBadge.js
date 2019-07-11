import React,{Component} from 'react';
import TabIcon from './TabIcon';
class TabIconWithBadge extends Component{
  render(){
    return(
      <TabIcon {...this.props} badgeCount={3}/>
    )
  }
}

export default TabIconWithBadge;