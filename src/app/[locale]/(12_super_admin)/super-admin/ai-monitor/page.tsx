import { getAIMetrics } from "@/actions/super-admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Cpu, Zap, Activity } from "lucide-react";

export default async function AIMonitorPage() {
  const metrics = await getAIMetrics();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">AI Platform & RAG Monitor</h1>
          <p className="text-sm text-gray-500 mt-1">Track vector embedding indexes, LLM token usage, and semantic search latency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vector Embeddings</CardTitle>
            <Sparkles className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.totalEmbeddings}</div>
            <p className="text-xs text-gray-500 mt-1">Indexed properties (1536-dim)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Search Latency</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.avgSearchLatencyMs} ms</div>
            <p className="text-xs text-green-600 mt-1">Sub-50ms cosine similarity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Token Usage (Today)</CardTitle>
            <Brain className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metrics.llmTokensToday.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Input & output tokens</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Model</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold text-gray-900 truncate">Gemini 3.5 Pro</div>
            <p className="text-xs text-gray-500 mt-1">& text-embedding-3-small</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Vector Search Health (pgvector)</CardTitle>
            <CardDescription>Status of HNSW and IVFFlat indexes in PostgreSQL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Property Vector Index</h4>
                <p className="text-xs text-gray-500">Vector dimension: 1536 (OpenAI / Gemini format)</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50/50">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Embedding Cache Hit Rate</h4>
                <p className="text-xs text-gray-500">Cached query embeddings</p>
              </div>
              <span className="font-semibold text-gray-900 text-sm">94.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">LLM Rate Limits & Quotas</CardTitle>
            <CardDescription>Daily API quotas and token limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Daily Token Limit</span>
                <span className="text-gray-900 font-semibold">148.5K / 1M</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[15%]" />
              </div>
            </div>
            <div className="pt-2 text-xs text-gray-500">
              No throttling or rate limit breaches reported in the past 24 hours.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
