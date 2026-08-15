import { NextResponse } from 'next/server';

export interface TelemetryPayload {
  sessionId: string;
  eventType: 'landing' | 'scroll_milestone' | 'click_cta' | 'page_transition' | 'exit';
  sourceRoute: string;
  destinationRoute?: string;
  scrollDepthPercentage?: number;
  clickTarget?: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

// In-memory telemetry log buffer (persists across requests during runtime)
const telemetryBuffer: TelemetryPayload[] = [];
const MAX_BUFFER_SIZE = 500;

export async function POST(request: Request) {
  try {
    const payload: TelemetryPayload = await request.json();
    
    if (!payload.eventType || !payload.sourceRoute) {
      return NextResponse.json({ success: false, error: 'Invalid telemetry payload' }, { status: 400 });
    }

    const eventRecord: TelemetryPayload = {
      ...payload,
      timestamp: payload.timestamp || new Date().toISOString(),
    };

    telemetryBuffer.push(eventRecord);
    if (telemetryBuffer.length > MAX_BUFFER_SIZE) {
      telemetryBuffer.shift();
    }

    console.log(`[Telemetry Log] [${eventRecord.eventType.toUpperCase()}] ${eventRecord.sourceRoute} -> ${eventRecord.destinationRoute || 'N/A'} (${eventRecord.clickTarget || 'no target'})`);

    return NextResponse.json({ success: true, count: telemetryBuffer.length });
  } catch (error) {
    console.error('Failed to log telemetry:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    totalLoggedEvents: telemetryBuffer.length,
    recentEvents: telemetryBuffer.slice(-50).reverse(),
  });
}
