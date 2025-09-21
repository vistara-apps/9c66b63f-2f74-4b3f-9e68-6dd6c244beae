'use client'

import { useState } from 'react'
import { TipRequest } from '@/types'
import { Button } from '@/components/ui/Button'

interface TipInputFormProps {
  contentItemId: string
  onSubmit: (tipRequest: TipRequest) => void
  onCancel: () => void
  isLoading?: boolean
}

export function TipInputForm({
  contentItemId,
  onSubmit,
  onCancel,
  isLoading = false
}: TipInputFormProps) {
  const [amount, setAmount] = useState<string>('0.01')
  const [message, setMessage] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tipAmount = parseFloat(amount)
    if (tipAmount > 0) {
      onSubmit({
        contentItemId,
        amount: tipAmount,
        message: message.trim() || undefined
      })
    }
  }

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card">
      <h3 className="text-xl font-semibold text-text mb-4">Send a Tip</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-text mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.001"
            min="0.001"
            className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
            Message (Optional)
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-background border border-primary/20 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Leave a nice message..."
            maxLength={280}
          />
          <p className="text-xs text-text/50 mt-1">
            {message.length}/280 characters
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isLoading || parseFloat(amount) <= 0}
            className="flex-1"
          >
            {isLoading ? 'Sending...' : 'Send Tip'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

