import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, reason } = body;

    if (!status || !['Approve', 'Reject'].includes(status)) {
      return NextResponse.json(
        {
          status: 'fail',
          data: {
            status: 'Status must be Approve or Reject',
          },
        },
        { status: 400 }
      );
    }

    if (status === 'Reject' && !reason) {
      return NextResponse.json(
        {
          status: 'fail',
          data: {
            reason: 'Reason is required when rejecting a property',
          },
        },
        { status: 400 }
      );
    }

    // Mock updated property
    const updatedProperty = {
      id,
      title: 'Mock Property',
      status: status.toLowerCase(),
      reason: status === 'Reject' ? reason : null,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        status: 'success',
        data: {
          property: updatedProperty,
        },
      },
      { status: 200 }
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
