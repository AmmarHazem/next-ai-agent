import { ChatRequestBody, SSE_DATA_PREFIX, SSE_LINE_DELIMETER, StreamMessage, StreamMessageType } from "@/lib/models";
import { auth } from "@clerk/nextjs/server";

function sendSSEMessage({ data, writer }: { writer: WritableStreamDefaultWriter<Uint8Array<ArrayBuffer>>; data: StreamMessage }) {
  const encoder = new TextEncoder();
  return writer.write(encoder.encode(`${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMETER}`));
}

export async function POST(request: Request) {
  try {
    const authSession = await auth();
    if (!authSession?.userId) {
      return Response.error();
    }
    const body: ChatRequestBody = await request.json();
    const stream = new TransformStream<Uint8Array<ArrayBuffer>>({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter();
    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
    const startStream = async () => {
      try {
        await sendSSEMessage({ data: { type: StreamMessageType.connected }, writer });
      } catch (error) {
        console.log("startStream error", error);
        return Response.json({ error: "stream error" }, { status: 500 });
      }
    };
    startStream();
    return response;
  } catch (error) {
    console.log("--- chat stream error", error);
    return Response.error();
  }
}
