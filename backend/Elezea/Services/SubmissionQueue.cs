using System.Collections.Concurrent;
using System.Threading.Channels;

namespace Elezea.Services;

public interface ISubmissionQueue
{
    Task EnqueueAsync(int submissionId);
    Task<int> DequeueAsync(CancellationToken cancellationToken);
}

public class SubmissionQueue : ISubmissionQueue
{
    private readonly Channel<int> _channel;
    private readonly ChannelWriter<int> _writer;
    private readonly ChannelReader<int> _reader;

    public SubmissionQueue()
    {
        // Create an unbounded channel for submission IDs
        _channel = Channel.CreateUnbounded<int>();
        _writer = _channel.Writer;
        _reader = _channel.Reader;
    }

    public async Task EnqueueAsync(int submissionId)
    {
        await _writer.WriteAsync(submissionId);
    }

    public async Task<int> DequeueAsync(CancellationToken cancellationToken)
    {
        return await _reader.ReadAsync(cancellationToken);
    }
}
