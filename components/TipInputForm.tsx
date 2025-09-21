'use client';

import { useState } from 'react';
import { Zap, X } from 'lucide-react';
import { TipFormData } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TipInputFormProps {
  onSubmit: (amount: number, currency: string, message?: string) => void;
  onCancel: () => void;
  className?: string;
}

export function TipInputForm({ onSubmit, onCancel, className }: TipInputFormProps) {
  const [formData, setFormData] = useState<TipFormData>({
    amount: 0.001,
    currency: 'ETH',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const presetAmounts = [
    { amount: 0.001, currency: 'ETH', label: '0.001 ETH' },
    { amount: 0.005, currency: 'ETH', label: '0.005 ETH' },
    { amount: 0.01, currency: 'ETH', label: '0.01 ETH' },
    { amount: 5, currency: 'USDC', label: '$5 USDC' },
    { amount: 10, currency: 'USDC', label: '$10 USDC' },
    { amount: 25, currency: 'USDC', label: '$25 USDC' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) return;

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate transaction
      onSubmit(formData.amount, formData.currency, formData.message);
    } catch (error) {
      console.error('Tip submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      {/* Currency Selection */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Currency
        </label>
        <div className="flex space-x-2">
          {['ETH', 'USDC'].map((currency) => (
            <button
              key={currency}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, currency: currency as 'ETH' | 'USDC' }))}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                formData.currency === currency
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text/60 hover:text-text hover:bg-surface/80'
              )}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Amounts */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Quick Select
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presetAmounts
            .filter(preset => preset.currency === formData.currency)
            .map((preset, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  amount: preset.amount,
                  currency: preset.currency as 'ETH' | 'USDC'
                }))}
                className={cn(
                  'px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 border',
                  formData.amount === preset.amount && formData.currency === preset.currency
                    ? 'bg-primary/20 border-primary text-primary'
                    : 'bg-surface border-white/10 text-text/60 hover:text-text hover:border-white/20'
                )}
              >
                {preset.label}
              </button>
            ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Custom Amount
        </label>
        <div className="relative">
          <input
            type="number"
            step={formData.currency === 'ETH' ? '0.001' : '1'}
            min="0"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
            className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200"
            placeholder={`Enter amount in ${formData.currency}`}
          />
          <span className="absolute right-3 top-2 text-sm text-text/50">
            {formData.currency}
          </span>
        </div>
      </div>

      {/* Optional Message */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Message (Optional)
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-text placeholder-text/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
          rows={2}
          placeholder="Add a personal message..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-surface border border-white/10 text-text rounded-lg font-medium hover:bg-surface/80 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || formData.amount <= 0}
          className="flex-1 px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Send Tip</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
