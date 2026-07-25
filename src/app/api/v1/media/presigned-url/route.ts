import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  try {
    // We could extract file information from request if needed, like filename or contentType
    // const body = await request.json();
    
    const dummyKey = `uploads/${randomUUID()}/dummy-image.jpg`;
    
    // Generate mock S3 presigned URL response
    return NextResponse.json(
      {
        status: "success",
        data: {
          uploadUrl: `https://dummy-bucket.s3.ap-southeast-1.amazonaws.com/${dummyKey}?AWSAccessKeyId=MOCK_KEY&Signature=MOCK_SIGNATURE`,
          key: dummyKey,
        },
        message: "Presigned URL berhasil di-generate.",
      },
      { status: 201 } // or 200 OK
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
