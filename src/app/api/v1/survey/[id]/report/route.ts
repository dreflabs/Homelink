import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Parse the checklist report (format can be anything)
    const reportData = await request.json();

    // Mock successful save
    return NextResponse.json(
      {
        status: 'success',
        data: {
          surveyId: id,
          message: 'Survey report successfully submitted',
          reportReceived: reportData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Invalid request body or server error',
      },
      { status: 500 }
    );
  }
}
