import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'

function IfElseSettings({ selectedNodes, updateFormData }) {
    const [formData, setFormData] = useState({
        ifCondtion: '',
    })

    useEffect(() => {
        selectedNodes.data.settings && setFormData(selectedNodes.data.settings)
    }, [selectedNodes])

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value })
    }
    return (
        <div>
            <h2 className='font-bold'>If / Else</h2>
            <p className='text-gray-600 mt-1'>
                Create condition to branch your workflow
            </p>
            <div className='mt-2 space-y-2'>
                <Label>If</Label>
                <Input value={formData?.ifCondtion} onChange={(event) => handleChange("ifCondtion", event.target.value)} placeholder='Enter condition' />
            </div>
            <Button onClick={() => updateFormData(formData)} className='w-full mt-3'>Save</Button>
        </div>
    )
}

export default IfElseSettings
