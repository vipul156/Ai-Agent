import React from 'react'
import AgentSettings from '../_nodeSetting/AgentSettings'
import EndSettings from '../_nodeSetting/EndSettings'
import WhileSettings from '../_nodeSetting/WhileSettings'
import IfElseSettings from '../_nodeSetting/IfElseSettings'
import UserApporval from '../_nodeSetting/UserApporval'
import { showToast } from 'nextjs-toast-notify';
import ApiAgentSettings from '../_nodeSetting/ApiSettings'

function AgentSetting({selectedNodes, setAddedNode}) {

  const updateFormData = (formData) => {
    const updatedForm = {
      ...selectedNodes,
      data : {
        ...selectedNodes.data,
        label : formData.name || selectedNodes.data.name,
        settings : formData
      }
    }

    setAddedNode((prev)=> prev.map((node) => node.id === selectedNodes.id ? updatedForm : node))
    showToast.success("Settings Updated", {
      duration: 4000,
      progress: true,
      position: "top-right",
      transition: "bounceIn",
      icon: '',
      sound: true,
    }); 
  }

  return (selectedNodes &&
    <div className='p-5 bg-white rounded-2xl w-[350px] shadow'>
     {selectedNodes.type === 'AgentNode' && <AgentSettings selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
     {selectedNodes.type === 'EndNode' && <EndSettings selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
     {selectedNodes.type === 'WhileNode' && <WhileSettings selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
     {selectedNodes.type === 'IfElseNode' && <IfElseSettings selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
     {selectedNodes.type === 'ApiNode' && <ApiAgentSettings selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
     {selectedNodes.type === 'ApprovalNode' && <UserApporval selectedNodes={selectedNodes} updateFormData={updateFormData}/>}
    </div>
  )
}

export default AgentSetting
