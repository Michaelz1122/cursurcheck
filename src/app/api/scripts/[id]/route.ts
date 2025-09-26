import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const script = await db.script.findUnique({
      where: { id: params.id }
    })

    if (!script) {
      return NextResponse.json(
        { error: 'Script not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(script)
  } catch (error) {
    console.error('Get script error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, code, type, placement, isGlobal, pageId, conditions, isActive } = await request.json()

    const existingScript = await db.script.findUnique({
      where: { id: params.id }
    })

    if (!existingScript) {
      return NextResponse.json(
        { error: 'Script not found' },
        { status: 404 }
      )
    }

    const script = await db.script.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(code !== undefined && { code }),
        ...(type && { type }),
        ...(placement && { placement }),
        ...(isGlobal !== undefined && { isGlobal }),
        ...(pageId !== undefined && { pageId }),
        ...(conditions !== undefined && { conditions }),
        ...(isActive !== undefined && { isActive })
      }
    })

    return NextResponse.json(script)
  } catch (error) {
    console.error('Update script error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.script.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Script deleted successfully' })
  } catch (error) {
    console.error('Delete script error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}