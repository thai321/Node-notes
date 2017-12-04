

```ruby
#  Given an array with arrays of arrays of times where people are busy
#  return all possible times they are all free to schedule a meeting

# input [ [[6,9],[9,10],[12,15]],[[5,7],[11,14],[17,18]],[[6,10],[16,19]] ]
# output [[0,5],[10,11],[15,16],[19,24]]

schedules = [ [[6,9],[9,10],[12,15]],
              [[5,7],[11,14],[17,18]],
              [[6,10],[16,19]] ]

def schedule_meeting(schedules)
  #start with entire day available
  available_times = []
  all_meetings = []
  #iterate thru each persons schedule, block that from being available
  schedules.each do |schedule|
    all_meetings += schedule
  end

  all_meetings.sort!

  (0...(all_meetings.length -  1)).each do |idx|
    if all_meetings[idx+1][0] <= all_meetings[idx][1]
      all_meetings[idx+1][0] = [all_meetings[idx][0], all_meetings[idx+1][0]].min
      all_meetings[idx+1][1] = [all_meetings[idx][1], all_meetings[idx+1][1]].max
      all_meetings[idx] = nil
    end
  end

  all_meetings.compact!
  available_times << [0, all_meetings[0][0]]
  (0...(all_meetings.length - 1)).each do |idx|
    available_times << [all_meetings[idx][1], all_meetings[idx + 1][0]]
  end
  available_times << [all_meetings[-1][1], 24]
  p available_times

end


schedule_meeting(schedules)

```
