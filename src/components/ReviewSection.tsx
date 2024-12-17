"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ReviewFormData {
  rating: number;
  comment: string;
}

export default function ReviewSection({ productId }: { productId: string }) {
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, reset } = useForm<ReviewFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: ReviewFormData) => {
    // Here you would typically send the review data to your backend
    console.log({ productId, ...data });
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    reset();
    setRating(0);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Write a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <input
            type="hidden"
            {...register("rating", { required: true })}
            value={rating}
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2">
            Your Review
          </label>
          <Textarea
            id="comment"
            {...register("comment", { required: true })}
            rows={4}
            placeholder="Write your review here..."
          />
        </div>
        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  );
}

