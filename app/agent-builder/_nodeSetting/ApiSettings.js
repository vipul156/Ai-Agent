"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { showToast } from "nextjs-toast-notify";
import { FileJson } from "lucide-react";

function ApiAgentSettings({ selectedNodes, updateFormData }) {
  const [formData, setFormData] = useState({
    name: "",
    method: "GET",
    url: "",
    apiKey: "",
    includeApiKey: true,
    bodyParams: '{ "param1": "value1" }',
    headers: '{ "Content-Type": "application/json" }',
    timeout: 10
  });

  // Merge incoming settings so fields never become undefined
  useEffect(() => {
    selectedNodes.data.settings && setFormData(selectedNodes.data.settings)
  }, [selectedNodes]);

  const handleChange = (key, value) => {
    setFormData(({...formData, [key]: value}));
  };

  

  const onSave = () => {
    if (!formData.name || !formData.name.trim()) {
      showToast.error("Name is required");
      return;
    }
    if (!formData.url || !formData.url.trim()) {
      showToast.error("API URL is required");
      return;
    }
    updateFormData(formData);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">API Agent</h2>
      <p className="text-sm text-gray-600">
        Call an external API endpoint with your chosen method
      </p>

      <div className="space-y-3">
        <div>
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="API Agent Name"
          />
        </div>

        <div>
          <Label>Request Method</Label>
          <Select
            value={formData.method}
            onValueChange={(val) => handleChange("method", val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>API URL</Label>
          <Input
            value={formData.url ?? ""}
            onChange={(e) => handleChange("url", e.target.value)}
            placeholder="https://api.example.com/data"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="mb-1">Include API Key</Label>
            <p className="text-xs text-gray-500">Toggle to include API key</p>
          </div>
          <Switch
            checked={!!formData.includeApiKey}
            onCheckedChange={(val) => handleChange("includeApiKey", val)}
          />
        </div>

        {formData.includeApiKey && (
          <div>
            <Label>API Key</Label>
            <Input
              type="password"
              value={formData.apiKey ?? ""}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              placeholder="••••••••"
            />
          </div>
        )}
        {formData.method === "POST" && (
        <div>
          <div className="flex items-center justify-between">
            <Label>Body Parameters (JSON)</Label>
            <button
              type="button"
              onClick={parseJsonToBody}
              title="Validate & format JSON"
              className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded"
            >
              <FileJson size={16} />
              Validate
            </button>
          </div>
          <Textarea
            value={formData.bodyParams ?? ""}
            onChange={(e) => handleChange("bodyParams", e.target.value)}
            rows={6}
            placeholder='{ "param1": "value1", "param2": "value2" }'
          />
        </div>
         )}
        <div>
          <Button onClick={onSave} className="w-full">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApiAgentSettings;
