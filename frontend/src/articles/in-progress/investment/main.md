# Title

## Purpose

Learning about investment is crucial for individuals to effectively grow their wealth and secure their financial future.

## Concept

DCF (Discounted Cash Flow) is a financial valuation method used to determine the present value of an investment's future cash flows.

$$DCF = C_0 + C_1/(1+r_1) + C_2/(1+r_2)^2 + ... + C_n/(1+r_n)^n + ...$$

where

* $$r_i$$ is the rate of return of the US treasury bound (non-risk return)
* $$C_i$$ is the certain amount of net cash inflow (cash inflow - cash outflow) on period i

The expected investment returns can be calculated as

$$E(DCF) = E(C_0) + E(C_1)/(1+r_1) + E(C_2)/(1+r_2)^2 + ... + E(C_n)/(1+r_n)^n + ...$$

Here I move the risk in net cash inflow, letting me keep using the non-risk rate of return as discount rate; for example, on period 1, I have 20% to have 100, 60% to have 150, and 20% to have 200, then E(C_1) = 150 rather than some certain value such as 160 and increase the discount rate; for example, 6%, to consider the risk. That is,

$$E(DCF) = C_0 + C_1/(1+r_1+g_1) + C_2/(1+r_2+g_2)^2 + ... + E(C_n)/(1+r_n+g_n)^n + ...$$

or

$$E(DCF) = C_0 + C_1/(1+r_1)(1+g_1) + C_2/(1+r_2)(1+g_2)^2 + ... + E(C_n)/(1+r_n)(1+g_n)^n + ...$$

### Bias

* Anchoring: The tendency to rely too heavily on the first piece of information encountered (the "anchor") when making decisions.
* Availability Heuristic (Availability Bias): The tendency to overestimate the likelihood of events with greater "availability" in memory, which can be influenced by how recent the memories are or how emotionally charged they are.
* Bandwagon Effect: The tendency to do (or believe) things because many other people do (or believe) the same.
* Blind Spot Bias: Failing to recognize your cognitive biases is a bias in itself.
* Conjunction Fallacy: The tendency to assume that specific conditions are more probable than a single general one.
* Clustering Illusion: This is the tendency to see patterns in random events.
* Confirmation Bias: The tendency to search for, interpret, focus on and remember information in a way that confirms one's preconceptions.
* Conservatism Bias: The tendency to revise one's belief insufficiently when presented with new evidence.
* The Curse of Knowledge: When better-informed people find it extremely difficult to think about problems from the perspective of lesser-informed people.
* Disposition Effect: The tendency to sell assets that have increased in value but hold assets that have decreased in value.
* Endowment Effect: The fact that people often demand much more to give up an object than they would be willing to pay to acquire it.
* The Framing Effect: Drawing different conclusions from the same information, depending on how that information is presented.
* Gambler’s Fallacy: The tendency to think that future probabilities are altered by past events, when in reality they are unchanged.
* Gratification Bias: Preferring immediate payoffs over delayed ones.
* Herding Effect: The tendency to follow the crowd, assuming the collective actions of a group to be correct.
* House Money Effect: The tendency to take more and greater risks when investing with profits from previous gains.
* The IKEA Effect: The tendency for people to place a disproportionately high value on objects that they partially assembled themselves.
* The Illusion of Control: The tendency to overestimate one's degree of influence over other external events.
* Illusion of Validity: Believing that one's abilities are greater than the situation calls for.
* Information Bias: The tendency to seek information even when it cannot affect action.
* Loss Aversion: The tendency to prefer avoiding losses to acquiring equivalent gains.
* Mental Accounting Bias: The tendency to treat money differently depending on where it comes from, where it is kept, or how it is spent.
* Observational Selection Bias: The effect of suddenly noticing things we didn't notice that much before — but we wrongly assume that the frequency has increased.
* Observer Expectancy Effect: When a researcher expects a given result and therefore unconsciously manipulates an experiment or misinterprets data in order to find it.
* Optimism Bias: The tendency to be over-optimistic, underestimating greatly the probability of undesirable outcomes and overestimating favorable and pleasing outcomes.
* Outcome Bias: Judging a decision based on the outcome—rather than how exactly the decision was made in the moment.
* Overconfidence Bias: Excessive confidence in one's own answers to questions.
* Pessimism Bias: The tendency for some people, especially those suffering from depression, to overestimate the likelihood of negative things happening to them.
* Prospect Theory: People make decisions based on the potential value of losses and gains rather than the final outcome.
* Reactive Devaluation: Devaluing proposals only because they are purportedly originated with an adversary.
* Recency Bias: The tendency to weigh the latest information more heavily than older data.
* Regret Aversion: The tendency to avoid making decisions that could lead to feelings of regret.
* Risk Compensation: The tendency to take greater risks when perceived safety increases.
* Status Quo Bias: The tendency to like things to stay relatively the same.
* Sunk Cost Effect: The tendency to continue an endeavor once an investment in money, effort, or time has been made.

#### Conflicts

?

* Availability heuristic vs. optimism bias: Overestimating the likelihood of events based on their availability in memory (availability heuristic) might conflict with being overly optimistic about favorable outcomes and underestimating the probability of negative events (optimism bias).
* Loss aversion vs. risk compensation: The tendency to prefer avoiding losses to acquiring equivalent gains (loss aversion) might conflict with taking greater risks when perceived safety increases (risk compensation).
* Recency bias vs. conservatism bias: Weighing the latest information more heavily than older data (recency bias) might conflict with the tendency to revise one's belief insufficiently when presented with new evidence (conservatism bias).
* Sunk cost effect vs. regret aversion: The tendency to continue an endeavor once an investment has been made (sunk cost effect) might conflict with avoiding decisions that could lead to feelings of regret (regret aversion).

#### Common Trading Biases

?

Fail to Cut Losses vs. Impatient Exits -> seems conflicts

#### Trade Model

A-book vs B-book: In the A-Book model, brokers act as intermediaries, passing clients' orders directly to liquidity providers without taking opposing positions, fostering transparency and trust in the trading process. Conversely, in the B-Book model, brokers assume the role of the counterparty to clients' trades, potentially profiting from clients' losses, which can lead to conflicts of interest and perceived lack of transparency.

##### A book

In the A-Book model, brokers typically do not engage in further trading activities like they do in the B-Book model. Here's why:

Pass-Through Mechanism: In the A-Book model, brokers act primarily as intermediaries between clients and the interbank market. They pass clients' orders directly to liquidity providers without taking the opposite side of the trade. As a result, the broker does not hold positions from clients' trades and therefore does not have the opportunity to engage in further trading activities based on those positions.
Neutrality and Transparency: The A-Book model emphasizes neutrality and transparency, with brokers facilitating trades without interference or conflicts of interest. By simply passing clients' orders to liquidity providers, brokers maintain transparency in pricing and execution, which enhances trust and confidence among traders.
Risk Management: Since brokers in the A-Book model do not hold positions from clients' trades, they do not need to engage in further trading activities for risk management purposes. Instead, they rely on their relationships with liquidity providers and risk management practices to ensure efficient order execution and manage their own exposure to market risk.
Revenue Generation: In the A-Book model, brokers earn revenue primarily through commissions and spreads charged to clients for executing trades. Unlike in the B-Book model, where brokers may profit from clients' losses, brokers in the A-Book model do not have a direct financial incentive to engage in further trading activities beyond order execution.
Overall, the A-Book model is designed to prioritize transparency, neutrality, and efficient order execution by simply passing clients' orders to the market without intervening or conducting further trading activities. This model aims to align the interests of brokers with those of their clients and the broader market, fostering trust and integrity in the trading environment.

##### B book

Yes, in the B-Book model, the broker can engage in further trading activities based on the positions it holds from its clients' trades. Since the broker acts as the counterparty to its clients' trades, it effectively holds positions in the market. These positions can be managed and traded upon by the broker to hedge its exposure, adjust risk, or capitalize on market movements.

Here's how the broker can conduct further trading activities:

Hedging: If the broker accumulates a significant exposure to a particular currency pair from its clients' trades, it may choose to hedge its risk by taking offsetting positions in the interbank market. For example, if the broker holds a net long position in EUR/USD from its clients' trades, it may hedge by selling EUR/USD in the interbank market to offset its exposure.
Speculative Trading: The broker can also engage in speculative trading based on its market analysis and trading strategies. This could involve taking positions in the market to capitalize on expected price movements or trading opportunities. However, it's important to note that speculative trading by the broker may expose it to additional market risk.
Risk Management: Brokers may use trading activities to manage their overall risk exposure. For example, if the broker anticipates increased volatility in the market, it may adjust its positions or hedge accordingly to mitigate potential losses.
Market Making: As part of its role as a market maker, the broker may engage in trading activities to provide liquidity to its clients and ensure smooth trade execution. This involves quoting bid and ask prices for various financial instruments and executing trades with clients at those prices.
Overall, the broker in the B-Book model has the flexibility to conduct further trading activities based on its positions from clients' trades, with the aim of managing risk, hedging exposure, and potentially generating profits. However, these activities must be conducted in accordance with regulatory requirements and ethical standards to ensure fairness and transparency in the trading environment.

###### Example

Client's Order: The client wants to buy USD at a price of 30.
Broker's Position: The broker already holds USD acquired in the past and anticipates that the USD price will decrease to 29 in the future.
Execution of Client's Order: The broker can fulfill the client's order using the USD it currently holds in its position. This means that the broker sells the USD to the client at the agreed-upon price of 30.
Adjusting Broker's Position: After fulfilling the client's order, the broker adjusts its position in the market to reflect the trade. Since the broker believes the USD price will decrease in the future, it may choose to sell USD in the market at the current price of 30, with the intention of buying it back at a lower price of 29 in the future.
Profit Potential: If the USD price indeed decreases to 29 in the future as anticipated by the broker, the broker can buy back the USD at the lower price, realizing a profit on the trade. This profit offsets the cost of fulfilling the client's order at 30, potentially allowing both the broker and the client to benefit from the transaction.

##### Hybrid

The Hybrid brokerage model combines elements of both the A-Book and B-Book models by allowing brokers to selectively choose how they handle clients' orders. Here's how these elements are combined:

Order Routing Flexibility: In the Hybrid model, brokers have the flexibility to decide whether to pass clients' orders directly to external liquidity providers (A-Book) or keep them in-house and act as the counterparty (B-Book). This decision can be based on factors such as market conditions, client preferences, and risk management strategies.
Client Segmentation: Brokers may segment their client base and apply different execution methods based on factors such as trading volume, account size, and risk profile. For example, high-volume traders or institutional clients may have their orders routed directly to external liquidity providers, while smaller retail clients' orders may be executed in-house.
Risk Management Strategies: The Hybrid model allows brokers to employ a combination of risk management strategies from both the A-Book and B-Book models. For instance, brokers may hedge certain positions externally to mitigate risk while keeping other positions in-house to capitalize on potential profits.
Adaptive Approach: Brokers can dynamically adjust their execution methods based on changing market conditions and client needs. For example, during periods of high market volatility, brokers may choose to route more orders externally to minimize risk exposure, while in calmer market conditions, they may execute more orders in-house to optimize profitability.
By combining elements of both the A-Book and B-Book models, the Hybrid brokerage model offers brokers greater flexibility, adaptability, and customization in their trading operations, allowing them to optimize risk management and revenue generation while maintaining transparency and fairness in the trading environment.

In a Hybrid brokerage model, brokers have the flexibility to selectively route clients' orders to either an A-Book or B-Book execution method based on various factors such as market conditions, client preferences, and risk management strategies. However, returning A-Book customers with their positions to the B-Book execution method would typically not align with the principles of transparency and fairness associated with the A-Book model.

### Wealth Disparities

Given DCF, there must be different DCF outcomes on different people. The problem lands on

* whether expected cash inflow is reasonable
* whether expected cash outflow is reasonable

The concept of pareto efficiency explains clearly that if the cash flow will not cause damage to other's cash flow, then it is reasonable.

#### reasoning

Wealth disparities, within the framework of Discounted Cash Flow (DCF) analysis, are a natural consequence of the diverse financial circumstances and investment strategies that individuals employ. DCF analysis involves estimating the present value of an investment's future cash flows, which can differ significantly from one person to another based on their unique financial situations and risk tolerance. These variations in expected cash inflow and outflow lead to wealth disparities, as different individuals may have distinct projections for their investment returns.

The concept of pareto efficiency provides a valuable lens through which to evaluate these wealth disparities. It asserts that an investment's cash flow is reasonable if it doesn't harm or negatively affect the financial well-being of others. In other words, as long as an individual's investment decisions do not impede the financial prospects of someone else, they can be considered reasonable. This principle acknowledges the inherent diversity in financial choices and investments, allowing individuals the freedom to pursue strategies that align with their goals and preferences.

Furthermore, wealth disparities can also be attributed to differences in risk tolerance and the sources of income for various individuals. Some may be willing to take on higher risks in pursuit of potentially greater returns, while others prioritize stability and lower-risk investments. This variation in risk profiles adds another layer of complexity to wealth disparities, as individuals make choices aligned with their comfort levels and financial objectives.

In conclusion, wealth disparities are reasonable within the context of DCF analysis, as they stem from the individuality of financial circumstances, risk preferences, and investment strategies. The principle of pareto efficiency affirms the reasonableness of these disparities, emphasizing that investment choices should not harm the financial well-being of others. The diversity in risk tolerance and income sources further contributes to the natural variability in wealth accumulation and investment outcomes.
